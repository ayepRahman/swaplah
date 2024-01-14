// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleSwaplahExchange
 * @author onlyayep
 * @dev Implements a simple decentralized exchange for swapping tokens
 */
contract SimpleSwaplahExchange is ERC20 {
    IERC20 public token1;
    IERC20 public token2;

    uint public reserve1;
    uint public reserve2;
    uint public constant FEE_RATE = 1; // 0.1% fee

    constructor(
        address _token1,
        address _token2
    ) ERC20("SwaplahLiquidityToken", "SLQT") {
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
    }

    /**
     * @dev Adds liquidity to the exchange
     * This function allows users to add an equal value of token1 and token2
     * to the liquidity pool. The user's liquidity tokens represent their share
     * of the pool.
     */
    function addLiquidity(uint _amount1, uint _amount2) external {
        token1.transferFrom(msg.sender, address(this), _amount1);
        token2.transferFrom(msg.sender, address(this), _amount2);

        uint liquidityMinted = _amount1 + _amount2; // Simplified
        _mint(msg.sender, liquidityMinted); // Minting liquidity tokens to the provider

        reserve1 += _amount1;
        reserve2 += _amount2;
    }

    /**
     * @dev Removes liquidity tokens in exchange for underlying assets
     * This function allows users to remove their liquidity tokens in exchange for
     * the underlying assets at the current ratio.
     */
    function removeLiquidity(uint _liquidity) external {
        require(balanceOf(msg.sender) >= _liquidity, "Not enough liquidity");

        uint token1Amount = (reserve1 * _liquidity) / totalSupply();
        uint token2Amount = (reserve2 * _liquidity) / totalSupply();

        _burn(msg.sender, _liquidity);
        token1.transfer(msg.sender, token1Amount);
        token2.transfer(msg.sender, token2Amount);

        reserve1 -= token1Amount;
        reserve2 -= token2Amount;
    }

    /**
     * @dev Swaps tokens between token1 and token2
     * This function allows users to swap token1 for token2, or token2 for token1
     * The swap amount is calculated based on the current reserves, minus a fee
     */
    function swap(address _tokenIn, uint _amountIn) external {
        require(
            _tokenIn == address(token1) || _tokenIn == address(token2),
            "Invalid token"
        );

        uint fee = calculateFee(_amountIn);
        uint amountInAfterFee = _amountIn - fee;

        if (_tokenIn == address(token1)) {
            uint token2Amount = getSwapAmount(
                amountInAfterFee,
                reserve1,
                reserve2
            );
            token1.transferFrom(msg.sender, address(this), _amountIn);
            token2.transfer(msg.sender, token2Amount);
            reserve1 += _amountIn;
            reserve2 -= token2Amount;
        } else {
            uint token1Amount = getSwapAmount(
                amountInAfterFee,
                reserve2,
                reserve1
            );
            token2.transferFrom(msg.sender, address(this), _amountIn);
            token1.transfer(msg.sender, token1Amount);
            reserve2 += _amountIn;
            reserve1 -= token1Amount;
        }
    }

    /**
     * @dev Calculates the fee amount from the input amount
     * This function calculates the fee that will be charged for a swap
     * @param _amountIn The input amount
     * @return The fee amount
     */
    function calculateFee(uint _amountIn) internal pure returns (uint) {
        return (_amountIn * FEE_RATE) / 1000;
    }

    /**
     * @dev Calculates the amount of tokens to swap for based on input amount and reserves
     * This function calculates how many tokens the user will receive on swap based on the
     * input amount and the current reserves of each token.
     * @param _amountIn The input amount of tokens provided by user
     * @param _reserveIn The current reserve of the input token
     * @param _reserveOut The current reserve of the output token
     * @return The amount of output tokens the user will receive
     */
    function getSwapAmount(
        uint _amountIn,
        uint _reserveIn,
        uint _reserveOut
    ) internal pure returns (uint) {
        require(_reserveIn > 0 && _reserveOut > 0, "Invalid reserves");
        uint amountOut = (_reserveOut * _amountIn) / (_reserveIn + _amountIn);
        return amountOut;
    }
}
