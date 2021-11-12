const anchor = require('@project-serum/anchor')

//git@github.com:hubdev4/solana-buildspace.git

// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3

const main = async() => {
	console.log('🚀 Starting test...')

	// Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!   
	const provider = anchor.Provider.env()
	anchor.setProvider(provider)

	const program = anchor.workspace.Myepicproject

	// Create an account keypair for our program to use.
	const baseAccount = anchor.web3.Keypair.generate()

	// Call start_stuff_off, pass it the params it needs!
	const tx = await program.rpc.startStuffOff({
		accounts: {
			baseAccount: baseAccount.publicKey,
			user: provider.wallet.publicKey,
			systemProgram: SystemProgram.programId,
		},
		signers: [baseAccount]
	})

	console.log('📝 Your transaction signature', tx)

	// Fetch data from the account.
	let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
	console.log('👀 GIF Count', account.totalGifs.toString())

	//call add_gif
	await program.rpc.addGif('https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif',{
		accounts: {
			baseAccount: baseAccount.publicKey,
			user: provider.wallet.publicKey,
		}
	})

	// Call the account.
	account = await program.account.baseAccount.fetch(baseAccount.publicKey);
	console.log('👀 GIF Count Updated', account.totalGifs.toString())

	//gif list
	console.log('👀 GIF List', account.gifList)
}

const runMain = async () => {
	try {
		await main()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()