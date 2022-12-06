import { shallowRef } from 'vue';
import api from '../../utils/api';

export default function useCompetitionsLoader() {
	const items = shallowRef();
	const loading = shallowRef(false);
	const loaded = shallowRef(false);

	async function fetchCompetitions(_competitionCode = null) {
		loading.value = true;
		const { data } = await api.get('football-data/competitions');
		items.value = data.competitions.filter(({ type }) => type === 'LEAGUE');
		loaded.value = true;
		loading.value = false;
	}

	fetchCompetitions();

	return { items };
}
