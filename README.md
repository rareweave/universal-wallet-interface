# Universal Wallet Interface Specification

## Interface Methods

### `connect(rpc?, options)`

- **Description:** Connects the wallet to the website
- **Parameters:**
  - `rpc` (String): RPC node so wallet can send on chain
  - `options` (Object): Configuration options for the wallet connection.

### `signature(data, options?): Promise<Data>`

- **Description:** Stamp a peice of data with proof its yours
- **Parameters:**
  - `data` (String): The data to be signed.
  - `options` (Object, optional): Options for signature
- **Returns:** A promise that resolves with the cryptographic signature.

### `sign(transaction, options?): Promise<Transaction>`

- **Description:** Sign a transaction
- **Parameters:**
  - `transaction` (Object): The transaction to be signed
  - `options` (Object, optional): Additional options for the signing process.
- **Returns:** A promise that resolves with the signed transaction.

### `send(signedTransaction, options?): Promise<Result>`

- **Description:** Send a signed transaction
- **Parameters:**
  - `signedTransaction` (Object): The signed transaction to be sent on chain
  - `options` (Object, optional): Additional options for sending the transaction.
- **Returns:** A promise that resolves with the hash of the transaction.

### `signAndSend(transaction, options?): Promise<Result>`

- **Description:** Sign a transaction and sends it on chain
- **Parameters:**
  - `transaction` (Object): The transaction to be signed & sent
  - `options` (Object, optional): Additional options for the signing or sending process.
- **Returns:** A promise that resolves with the hash of the transaction.

### `sendCoins(from, to, amount, options): Promise<Result>`

- **Description:** Send coins to someone
- **Parameters:**
  - `from` (string): Your address
  - `to` (string): The recipents address
  - `amount` (string | number): The amount you want to send (Denominated)
  - `options` (Object, optional): Additional options for the sendning process.
- **Returns:** A promise that resolves with the signed transaction hash

### `waitForFinality(transactionHash): Promise<Result>`

- **Description:** Waits for transaction to be confirmed and on chain
- **Parameters:**
  - `transactionHash` (String): The hash of the transaction to wait for.
- **Returns:** A promise that resolves when the transaction is confirmed, or rejects on timeout or failure.

### `getActiveAddress(): Promise<string>`

- **Description:** Retrieves the wallet address of the connected wallet.
- **Returns:** A promise that resolves with the active wallet address as a string.

### `isConnected(): Promise<boolean>`

- **Description:** Checks if the wallet is connected or not
- **Returns:** A promise that resolves with the active wallet address as a string.
