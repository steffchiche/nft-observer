import axios from 'axios'

export const getDatabaseData = async () => {
	const res = await axios.get('https://weathered-unit-7f83.westykan.workers.dev')
	console.log(res.data)
}
