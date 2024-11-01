import '../components/styles/home.css'

import { Paper, Typography } from '@mui/material'
import type { Metadata } from 'next'

import { ProfileData } from '@/components/ProfileData'

export const metadata: Metadata = {
	title: 'Next DApp',
	description:
		'A template for building Ethereum-based dApps using Next.js, Material UI, Wagmi/Viem, and WalletConnect.',
}

const styles = {
	paper: {
		p: 4,
		textAlign: 'center',
	},
}

const DefaultPage = () => {
	return (
		<Paper sx={styles.paper}>
			<ProfileData />
		</Paper>
	)
}

export default DefaultPage
