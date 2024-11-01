import { Alchemy, Network } from 'alchemy-sdk'

import { getDelegatedTokens } from '@/utils/database'
import { getErrorResponse, getSuccessResponse } from '@/utils/serverResponses'

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
	apiKey: process.env.ALCHEMY_RPC_KEY, // Replace with your Alchemy API Key.
	network: Network.ETH_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)
getDelegatedTokens()

// GET /api
export async function GET(req: Request) {
	try {
		console.log('here')
		// Get params
		const { searchParams } = new URL(req.url)
		const walletAddress = searchParams.get('walletAddress')

		const nfts = await alchemy.nft.getContractsForOwner(walletAddress!)

		const result = nfts.contracts.map(s => ({
			contractAddress: s.address,
			image: s.image.pngUrl,
			name: s.name,
			type: s.tokenType,
		}))
		// Return success
		return getSuccessResponse(result)
	} catch (error: any) {
		return getErrorResponse(500, error.message, error)
	}
}

// POST /api
export async function POST(req: Request) {
	try {
		// Get params
		const params = await req.json()
		console.log({ params })

		// Return success
		return getSuccessResponse(null)
	} catch (error: any) {
		return getErrorResponse(500, error.message, error)
	}
}
