import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import { PublicKey } from "@solana/web3.js";

const votingAddress = new PublicKey("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ")
const IDL = require('../target/idl/voting.json');
describe("voting", () => {


  it("Is initialized poll", async () => {
    const context = await startAnchor("", [{ name: "voting", programId: votingAddress }], [])
    const provider = new BankrunProvider(context)
    const votingProgram = new Program<Voting>(IDL, provider)

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favourite type of peanut butter",
      new anchor.BN(1),
      new anchor.BN(13842384623864),

    ).rpc()
  });
});
