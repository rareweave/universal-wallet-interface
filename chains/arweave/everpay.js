import Everpay from "everpay";
import Arweave from "arweave";

var BufferFill = require("buffer/").Buffer;

export default class EverpayArweave {
  constructor() {
    if (typeof Buffer == "undefined") {
      window.Buffer = BufferFill;
    }

    this.arweave = Arweave.init({});

    // Hard coded for now, not all supported coins are in here
    this.Exponents = {
      AR: "1000000000000",
      ETH: "1000000000000000000",
      GLMR: "1000000000000000000",
      U: "1000000",
      BNB: "1000000000000000000",
      USDC: "1000000000000000000",
      DAI: "1000000000000000000",
      WBTC: "1000000000000000000",
      SOL: "1000000000",
    };
  }

  async connect() {
    this.everpay = new Everpay({
      account: await window.arweaveWallet.getActiveAddress(),
      chainType: "arweave",
      arJWK: "use_wallet",
    });
  }

  async signature(data) {
    const encodedMessage = new TextEncoder().encode(data);
    const signature = await this.provider.signMessage(encodedMessage, {
      hashAlgorithm: "SHA-256",
    });

    return this.arweave.utils.bufferTob64Url(signature);
  }

  async sign() {
    return "everpay cant sign data";
  }

  async send() {
    return Error("Use sendCoins()");
  }

  async signAndSend() {
    return Error("Use sendCoins()");
  }

  async sendCoins(
    from,
    to,
    amount,
    denom,
    options = {
      memo: "",
      waitForFinality: false,
    }
  ) {
    if (!denom) return Error("Denom must be included when sending coins");

    const { tokenList } = await this.everpay.info();

    const payingCoin = tokenList?.find((element) => element.symbol === denom);

    let send = await this.everpay.transfer({
      tag: payingCoin.tag,
      amount: (parseInt(amount) / this.Exponents[denom]).toString(),
      to: to,
    });

    return send.everHash;
  }

  // async waitForFinality(transactionHash) {
  //   try {
  //     await waitTillTxPublished(transactionHash, this.rpc);

  //     async function waitTillTxPublished(TxId, rpc, tries = 0) {
  //       if (tries >= 100) {
  //         return false;
  //       }
  //       try {
  //         const res = await (
  //           await fetch("https://" + rpc + "/tx/" + TxId)
  //         ).json();
  //         return "ok";
  //       } catch (e) {
  //         console.log(e);
  //         await wait(10000);
  //         return await waitTillTxPublished(TxId, rpc, ++tries);
  //       }
  //     }

  //     function wait(ms) {
  //       return new Promise((resolve) => {
  //         setTimeout(resolve, ms);
  //       });
  //     }
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }

  async getActiveAddress() {
    return await window.arweaveWallet.getActiveAddress();
  }

  async isConnected() {
    if (this.everpay) return true;
    else return false;
  }
}
