import Arweave from "arweave";

var BufferFill = require("buffer/").Buffer;

export default class ArConnectWallet {
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
    this.provider = window.arweaveWallet;
  }

  async connect(
    options = {
      permissions: [
        "ACCESS_ADDRESS",
        "DECRYPT",
        "ACCESS_PUBLIC_KEY",
        "DISPATCH",
        "SIGN_TRANSACTION",
        "ACCESS_ARWEAVE_CONFIG",
        "SIGNATURE",
        "ENCRYPT",
      ],
    }
  ) {
    if (!("arweaveWallet" in window && "connect" in window.arweaveWallet))
      return;

    const permissions = await window.arweaveWallet.getPermissions();

    // Means there is no permissions, soo let the wallet connect
    if (permissions.length <= 0) {
      await window.arweaveWallet.connect(
        options.permissions,
        options?.appInfo,
        options?.gateway
      );
    }

    return true;
  }

  async signature(data) {
    const encodedMessage = new TextEncoder().encode(data);
    const signature = await this.provider.signMessage(encodedMessage);

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

  async getActiveAddress() {
    return await this.provider.getActiveAddress();
  }

  async isConnected() {
    const permissions = await this.provider.getPermissions();

    if (permissions.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
}
