import React from "react";
import { ChainId } from "../../constants";
import { useActiveWeb3React } from "../../hooks";
import { useETHBalances } from "../../state/wallet/hook";
import cn from "./cn.module.scss";

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
}

const Header: React.FC<any> = () => {
  const { account, chainId } = useActiveWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <div className={cn.headerElement}>
      <div className={cn.hideSmall}>
        {chainId && NETWORK_LABELS[chainId] && (
          <span className={cn.networkCard} title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</span>
        )}
      </div>
      <div className={`${cn.accountElement} ${!!account ? cn.activatedElement : cn.inactivatedElement}`} style={{ pointerEvents: 'auto' }}>
        {account && userEthBalance ? (
          <span style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
            {userEthBalance?.toSignificant(4)} ETH
          </span>
        ) : null}
        <Web3Status />
      </div>
    </div>
  )}

export default Header;
