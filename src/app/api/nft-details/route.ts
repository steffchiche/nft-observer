import { Alchemy, Network } from 'alchemy-sdk'

import { getErrorResponse, getSuccessResponse } from '@/utils/serverResponses'

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
	apiKey: process.env.ALCHEMY_RPC_KEY, // Replace with your Alchemy API Key.
	network: Network.ETH_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)

// GET /api
export async function GET(req: Request) {
	try {
		// Get params
		const { searchParams } = new URL(req.url)
		const walletAddress = searchParams.get('walletAddress')
		const contractAddress = searchParams.get('contractAddress')
		const tokenIds = await alchemy.nft.getNftsForOwner(walletAddress!, {
			contractAddresses: [contractAddress!],
		})

		return getSuccessResponse(
			tokenIds.ownedNfts.map(s => ({
				tokenId: s.tokenId,
				image: s.image.pngUrl,
				amount: s.balance,
				// delegatedTokens: result,
			})),
		)
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
