import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'

import { getContract } from '../utils'

import { useActiveWeb3React } from "./web3"
import MULTICALL_ABI from '../abis/multicall2.json'
import ENS_ABI from '../abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json'
import UNISOCKS_ABI from '../abis/unisocks.json'
import { MULTICALL2_ADDRESSES, ENS_REGISTRAR_ADDRESSES, SOCKS_CONTROLLER_ADDRESSES } from '../constants/addresses'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useMulticallContract(): Contract | null {
  return useContract(MULTICALL2_ADDRESSES, MULTICALL_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useSocksController(): Contract | null {
  return useContract(SOCKS_CONTROLLER_ADDRESSES, UNISOCKS_ABI, false)
}

