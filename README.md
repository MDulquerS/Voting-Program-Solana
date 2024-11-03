# Solana Voting Program

This project is a decentralized voting system on the Solana blockchain, built with Anchor. It allows users to create and participate in verifiable, tamper-resistant polls. Users can initialize polls, register candidates, and cast votes, leveraging the speed and low transaction costs of Solana.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Features

- **Initialize Polls**: Create a new poll with a unique ID, description, start, and end dates.
- **Register Candidates**: Add candidates to each poll with unique identifiers.
- **Cast Votes**: Users can vote for a candidate in a specific poll.
- **Decentralized**: Runs on Solana, ensuring transparency and immutability.

## Project Structure

- **InitializePoll**: Sets up a new poll with a description and time bounds.
- **InitializeCandidate**: Registers a new candidate for a poll.
- **Vote**: Casts a vote for a specified candidate within a poll.

### Code Overview

- **Accounts**: 
  - `Poll`: Stores poll metadata (ID, description, start and end times, and number of candidates).
  - `Candidate`: Holds candidate details and vote count.

## Getting Started

### Prerequisites

- **Rust**: Install Rust from [rust-lang.org](https://www.rust-lang.org/).
- **Anchor**: Follow the official [Anchor installation guide](https://project-serum.github.io/anchor/getting-started/installation.html).
- **Solana CLI**: Download and set up the Solana CLI from [solana.com](https://docs.solana.com/cli/install-solana-cli-tools).

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/solana-voting-program.git
   cd solana-voting-program
   ```

2. Build the program:
   ```sh
   anchor build
   ```

3. Deploy the program to Solana:
   ```sh
   anchor deploy
   ```

## Usage

### Initialize a Poll

To start a new poll, call `initialize_poll` with:

- **poll_id**: Unique identifier for the poll.
- **poll_description**: Brief description of the poll (up to 280 characters).
- **poll_start**: Start time as a Unix timestamp.
- **poll_end**: End time as a Unix timestamp.

Example:
```rust
pub fn initialize_poll(ctx: Context<InitializePoll>, poll_id: u64, poll_description: String, poll_start: u64, poll_end: u64) -> Result<()> { /* ... */ }
```

### Register a Candidate

To add a candidate to a poll, use `initialize_candidate` with:

- **candidate_name**: Name of the candidate (up to 32 characters).
- **poll_id**: ID of the poll to which the candidate is being added.

Example:
```rust
pub fn initialize_candidate(ctx: Context<InitializeCandidate>, candidate_name: String, _poll_id: u64) -> Result<()> { /* ... */ }
```

### Cast a Vote

To vote for a candidate, use `vote` with:

- **candidate_name**: The name of the candidate receiving the vote.
- **poll_id**: ID of the poll in which the candidate is registered.

Example:
```rust
pub fn vote(ctx: Context<Vote>, _candidate_name: String, _poll_id: u64) -> Result<()> { /* ... */ }
```

## License

This project is licensed under the MIT License.
