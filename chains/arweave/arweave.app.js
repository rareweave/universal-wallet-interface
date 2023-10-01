import Arweave from "arweave";
import { ArweaveWebWallet } from "arweave-wallet-connector";

var BufferFill = require("buffer/").Buffer;

export default class ArweaveApp {
  constructor(rpc) {
    if (typeof Buffer == "undefined") {
      window.Buffer = BufferFill;
    }

    this.arweave = Arweave.init({
      host: rpc,
      port: 443,
      protocol: "https",
      timeout: 60_000,
      logging: false,
    });

    this.rpc = rpc;
  }

  async connect(
    options = ({
      name: "Local",
    },
    {
      state: {
        url: "arweave.app",
      },
    })
  ) {
    this.webwallet = new ArweaveWebWallet(options);

    this.webwallet.setUrl("arweave.app");

    await this.webwallet.connect();
  }

  // Needs to be done
  async signature(data) {
    const encodedMessage = new TextEncoder().encode(data);
    const signature = await this.webwallet.signMessage(encodedMessage);

    return signature;
  }

  async sign(transaction) {
    try {
      await this.arweave.transactions.sign(transaction);

      return transaction;
    } catch (e) {
      console.error("Failed to sign tx", e);
      return false;
    }
  }

  async send(
    transaction,
    options = {
      waitForFinality: false,
    }
  ) {
    try {
      await this.arweave.transactions.post(transaction);

      if (options.waitForFinality) {
        await this.waitForFinality(transaction.id);
      }

      return transaction.id;
    } catch (e) {
      console.error("Failed send tx", e);
      return false;
    }
  }

  async signAndSend(
    transaction,
    options = {
      waitForFinality: false,
    }
  ) {
    try {
      await this.arweave.transactions.sign(transaction);
    } catch (e) {
      console.error("Failed to sign tx", e);
      return false;
    }

    try {
      await this.arweave.transactions.post(transaction);
    } catch (e) {
      console.error("Failed post tx", e);
      return false;
    }

    if (options.waitForFinality) {
      await this.waitForFinality(transaction.id);
    }

    return transaction.id;
  }

  async sendCoins(
    from,
    to,
    amount,
    options = {
      memo: "",
      waitForFinality: false,
    }
  ) {
    let feeEstimate = await fetch(`https://g8way.io/price/1000000/${to}`)
      .then((res) => res.text())
      .catch((err) => {
        console.error("Failed to get fee estimate", err);
        return false;
      });

    let tx = await this.arweave.createTransaction({
      data: options.memo,
      target: to,
      quantity: amount.toString(),
      reward: feeEstimate,
    });

    try {
      await this.arweave.transactions.sign(tx);
    } catch (e) {
      console.error("Failed to sign tx", e);
      return false;
    }

    try {
      await this.arweave.transactions.post(tx);
    } catch (e) {
      console.error("Failed post tx", e);
      return false;
    }

    if (options.waitForFinality) {
      await this.waitForFinality(tx.id);
    }
    return tx.id;
  }

  async waitForFinality(transactionHash) {
    try {
      await waitTillTxPublished(transactionHash, this.rpc);

      async function waitTillTxPublished(TxId, rpc, tries = 0) {
        if (tries >= 100) {
          return false;
        }
        try {
          const res = await (
            await fetch("https://" + rpc + "/tx/" + TxId)
          ).json();
          return "ok";
        } catch (e) {
          console.log(e);
          await wait(10000);
          return await waitTillTxPublished(TxId, rpc, ++tries);
        }
      }

      function wait(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  getActiveAddress() {
    return this.webwallet.namespaces.arweaveWallet.getActiveAddress();
  }
}
