import React from "react";
import { NETWORK_LABELS, SupportedChainId } from '../../constants/chains'
import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from "../../state/wallet/hook";
import Web3Status from "../Web3Status";
import cn from "./cn.module.scss";

const Header: React.FC<any> = () => {
  const { account, chainId } = useActiveWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  console.log('ether amount===>>>', userEthBalance);
  return (
    <div className={cn.headerElement}>
      <div className={cn.hideSmall}>
        {chainId && chainId !== SupportedChainId.MAINNET && NETWORK_LABELS[chainId] && (
          <span className={cn.networkCard} title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</span>
        )}
      </div>
      <div className={`${cn.accountElement} ${!!account ? cn.activatedElement : cn.inactivatedElement}`} style={{ pointerEvents: 'auto' }}>
        {account && userEthBalance ? (
          <span style={{ flexShrink: 0 }} >
            {userEthBalance?.toSignificant(4)} ETH
          </span>
        ) : null}
        <Web3Status />
      </div>
    </div>
  )}

export default Header;
