import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
} from "@solana/web3.js";

var BufferFill = require("buffer/").Buffer;

export class PhantomWallet {
  constructor(rpc) {
    if (typeof Buffer == "undefined") {
      window.Buffer = BufferFill;
    }

    this.provider = window.phantom?.solana;
    this.connection = new Connection(rpc);
  }

  async connect() {
    if (!this.provider.isConnected) {
      try {
        const resp = await this.provider.connect();

        return true;
      } catch (e) {
        // Rejected pop up
        return false;
      }
    } else {
      // Wallet is connected
      return true;
    }
  }

  async signature(data) {
    const encodedMessage = new TextEncoder().encode(data);
    const signedMessage = await this.provider.signMessage(
      encodedMessage,
      "utf8"
    );

    return signedMessage;
  }

  async sign(transaction) {
    const signedTransaction = await this.provider.signTransaction(transaction);

    return signedTransaction;
  }

  async send(signedTransaction, options) {
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );

    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }

    return signature;
  }

  async signAndSend(transaction, options) {
    const signedTransaction = await this.provider.signTransaction(transaction);

    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );

    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }

    return signature;
  }

  async sendCoins(from, to, amount, options) {
    let fromPub = new PublicKey(from);
    let toPub = new PublicKey(to);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPub,
        toPubkey: toPub,
        lamports: BigInt(amount),
      })
    );

    transaction.feePayer = fromPub;
    const anyTransaction = transaction;
    anyTransaction.recentBlockhash = (
      await this.connection.getLatestBlockhash()
    ).blockhash;

    const signedTransaction = await this.provider.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );

    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }

    return signature;
  }

  async waitForFinality(transactionHash) {
    try {
      await this.connection.confirmTransaction(
        { signature: transactionHash },
        "finalized"
      );

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getActiveAddress() {
    return this.provider.publicKey.toString();
  }

  isConnected() {
    return this.provider.isConnected;
  }
}
