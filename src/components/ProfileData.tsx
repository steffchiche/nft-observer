'use client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { CollectionDetails } from './CollectionDetails'

export const ProfileData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<any>(undefined)
	const { address, isConnected } = useAccount()
	const [detailsOpen, setDetailsOpen] = useState<Record<string, boolean>>({})

	useEffect(() => {
		if (isConnected) {
			fetch('/api/nft-leaderboard?walletAddress=' + address)
				.then(res => res.json())
				.then(data => {
					setData(data.data)
					setIsLoading(false)
				})
		}
	}, [isConnected, address])

	const handleClick = (contractAddress: string) => {
		setDetailsOpen(prev => ({
			...prev,
			[contractAddress]: !prev[contractAddress],
		}))
	}

	return (
		<>
			{!isConnected ? (
				<div>Please connect your wallet</div>
			) : (
				<div>
					{data &&
						data.map((s: any, i: number) => (
							<>
								<div
									key={i}
									onClick={() => handleClick(s.contractAddress)}
									// style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', cursor: 'pointer' }}
									className="collection-row"
								>
									<div
										key={i}
										style={{ background: `url(${s.image})`, backgroundSize: 'contain', width: '50px', height: '50px' }}
									></div>
									<div
										key={i}
										style={{
											lineHeight: '50px',
											width: '250px',
											whiteSpace: 'nowrap',
											textOverflow: 'clip',
											overflow: 'hidden',
											color: '#53f3e3',
										}}
									>
										<a href={`https://etherscan.io/token/${s.contractAddress}`} target="_blank" rel="noreferrer">
											{s.name}
										</a>
									</div>
									<div key={i} style={{ lineHeight: '50px' }}>
										{s.type}
									</div>
								</div>
								{detailsOpen[s.contractAddress] && <CollectionDetails contractAddress={s.contractAddress} />}
							</>
						))}
				</div>
			)}
		</>
	)
}
