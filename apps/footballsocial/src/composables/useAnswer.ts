import { shallowRef, watch, onBeforeUnmount } from "vue";
import { supabaseClient } from "../service/supabase";

export type ANSWER = {
  discussion_id: string;
  body: string;
  username: string;
  created_at: string;
};

export function useAnswer(discussion_id: string) {
  const answers = shallowRef<ANSWER[]>([]);
  const users = shallowRef<String[]>([]);
  const limit = shallowRef(15);
  const loading = shallowRef(false);
  const loaded = shallowRef(false);
  const page = shallowRef(-1);
  const count = shallowRef<any>(null);

  const handleInsert = (payload: { new: ANSWER }) => {
    answers.value = [payload.new, ...answers.value];
  };

  const answerListener = supabaseClient
    .channel(`public:answer:discussion_id=eq.${discussion_id}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "answer" },
      async (payload) => {
        handleInsert(payload);
        users.value = await fetchUsers();
      }
    )
    .subscribe();

  onBeforeUnmount(() => supabaseClient.removeChannel(answerListener));

  async function fetchAnswers() {
    if (count.value && limit.value * page.value >= count.value) {
      return;
    }
    loading.value = true;
    await supabaseClient
      .from("answer")
      .select("*, profiles!answer_mentions_fkey(username)", { count: "exact" })
      .eq("discussion_id", discussion_id)
      .order("created_at", { ascending: false })
      .limit(limit.value)
      .range(limit.value * page.value, limit.value * page.value + limit.value)
      .then((data) => {
        loading.value = false;
        count.value = data.count;
        if (!data.error && data.data) {
          answers.value = [...answers.value, ...data.data];
        }
        loaded.value = true;
      });
    users.value = await fetchUsers();
  }

  async function fetchUsers(): Promise<String[]> {
    if (count.value && limit.value * page.value >= count.value) {
      return [];
    }
    const { data } = await supabaseClient.rpc("get_discussion_users", {
      discussion_id,
    });
    const { data: data1 } = await supabaseClient.rpc(
      "get_mentioned_discussion_users",
      {
        discussion_id,
      }
    );
    return Array.from(
      new Set(
        [...data, ...data1].map(({ username }) => username).filter((val) => val)
      )
    );
  }

  async function loadMore() {
    page.value += 1;
    fetchAnswers();
  }

  const addNewAnswer = async (username: string, body: string) => {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(body, "text/html");
    const mentions = Array.from(
      htmlDoc.querySelectorAll<HTMLElement>('[data-type="mention"]')
    ).map((node) => node.dataset?.id);

    const { data, error, count } = await supabaseClient
      .from("answer")
      .insert([
        {
          username,
          mentions: mentions[0],
          discussion_id,
          body,
        },
      ])
      .select();
    return { data, error };
  };

  return {
    loading,
    answers,
    users,
    addNewAnswer,
    fetchAnswers,
    loadMore,
    loaded,
  };
}
