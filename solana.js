const web3 = require("@solana/web3.js");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

const newPair = new web3.Keypair();


const userpublicKey = new web3.PublicKey(newPair._keypair.publicKey).toString();

const usersecretKey = newPair._keypair.secretKey;

const userWallet=web3.Keypair.fromSecretKey(usersecretKey);
console.log(userWallet);


const airDropSol = async(wallet,transferAmt)=>{
    try{
        console.log("<--- Air Dropping SOL --->");
        const fromAirDrop = await connection.requestAirdrop(new web3.PublicKey(wallet.publicKey.toString()), transferAmt*web3.LAMPORTS_PER_SOL);

        await connection.confirmTransaction(fromAirDrop);

    }catch(err){
        console.log(err);
    }
}


const transferSOL = async(from,to,transferAmt)=>{
    try{

        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

        const transaction = new web3.Transaction().add(web3.SystemProgram.transfer({
            fromPubkey:new web3.PublicKey(from.publicKey.toString()),
            toPubkey:new web3.PublicKey(to.publicKey.toString()),
            lamports:transferAmt*web3.LAMPORTS_PER_SOL
        }))

        const signature = await web3.sendAndConfirmTransaction(connection,transaction,[from])
        return signature;
        

    }catch(err){
        console.log(err);
    }
}

const getWalletBalance = async(pubk)=>{
    try{

        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

        const balance = await connection.getBalance(new web3.PublicKey(pubk));
        return balance/web3.LAMPORTS_PER_SOL;

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    airDropSol,
    transferSOL,
    getWalletBalance
}