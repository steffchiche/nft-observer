'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const CollectionDetails = ({ contractAddress }: { contractAddress: string }) => {
	const { address, isConnected } = useAccount()
	const [data, setData] = useState<any>(undefined)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		fetch(`/api/nft-details?walletAddress=${address}&contractAddress=${contractAddress}`)
			.then(res => res.json())
			.then(data => {
				setData(data.data)
				setIsLoading(false)
			})
	}, [address, isConnected, contractAddress])

	return (
		<>
			{data &&
				data.map((s: any, i: number) => (
					<div key={i} style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
						<div
							key={i}
							style={{
								lineHeight: '100px',
								color: 'yellow',
								width: '150px',
								whiteSpace: 'nowrap',
								textOverflow: 'clip',
								overflow: 'hidden',
							}}
						>
							<a href={`https://etherscan.io/nft/${contractAddress}/${s.tokenId}`} target="_blank" rel="noreferrer">
								Token: {s.tokenId}
							</a>
						</div>
						<div
							style={{ background: `url(${s.image})`, backgroundSize: 'contain', width: '100px', height: '100px' }}
						></div>
						<div style={{ lineHeight: '100px' }}>Balance: {s.amount}</div>
					</div>
				))}
		</>
	)
}
