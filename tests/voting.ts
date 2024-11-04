import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

const votingAddress = new PublicKey(
  "GqG5WCUCVhTus2kCXDZLo9AQr6qjG7MnYoiV9dDAoetj"
);
const IDL = require("../target/idl/voting.json");
describe("voting", () => {
  let context;
  let provider;
  let votingProgram;

  before(async () => {
    context = await startAnchor(
      "",
      [{ name: "voting", programId: votingAddress }],
      []
    );
    provider = new BankrunProvider(context);
    votingProgram = new Program<Voting>(IDL, provider);
  });

  it("Is initialized poll", async () => {
    await votingProgram.methods
      .initializePoll(
        new anchor.BN(1),
        "What is your favourite type of peanut butter",
        new anchor.BN(1),
        new anchor.BN(13842384623864)
      )
      .rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
      votingAddress
    );

    const poll = await votingProgram.account.poll.fetch(pollAddress);
    console.log(poll);
    expect(poll.pollId.toNumber()).equal(1);
    expect(poll.pollDescription).equal(
      "What is your favourite type of peanut butter"
    );
    expect(poll.pollStart.toNumber()).lessThan(poll.pollEnd.toNumber());
  });

  it("initialize candidate", async () => {
    await votingProgram.methods
      .initializeCandidate("Smoth", new anchor.BN(1))
      .rpc();
    await votingProgram.methods
      .initializeCandidate("Crunchy", new anchor.BN(1))
      .rpc();

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Crunchy")],
      votingAddress
    );
    const crunchyCandidate = await votingProgram.account.candidate.fetch(
      crunchyAddress
    );
    console.log(crunchyCandidate);
    expect(crunchyCandidate.candidateVotes.toNumber()).equal(0);
    const [smothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Smoth")],
      votingAddress
    );
    const smothCandidate = await votingProgram.account.candidate.fetch(
      smothAddress
    );
    console.log(smothCandidate);
    expect(smothCandidate.candidateVotes.toNumber()).equal(0);
  });

  it("vote", async () => {
    await votingProgram.methods.vote("Smoth", new anchor.BN(1)).rpc();
    const [smothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8), Buffer.from("Smoth")],
      votingAddress
    );
    const smothCandidate = await votingProgram.account.candidate.fetch(
      smothAddress
    );
    console.log(smothCandidate);
    expect(smothCandidate.candidateVotes.toNumber()).equal(1);
  });
});
