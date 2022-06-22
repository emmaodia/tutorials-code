/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen, AccountId, Promise, env};
use near_sdk::collections::LookupMap;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize<string>, BorshS<string>erialize)]
pub struct Contract {
    note: LookupMap<String, Vec<String>>
}

// Define the default, which automatically initializes the contract
impl Default for Contract{
   fn default() -> Self {
       Self { 
            note:LookupMap::new::(b"note".to_vec())
        }
   }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
 //state methods
pub fn donate(&mut self, account_Id:AccountId, amount: uf64) {
    Promise::new(account_id).transfer(amount as u128);
}

pub fn note (&mut self, note_text:String, amount:String) {
    let account_id: AccountId = env::signer_account_id();
    let user: Option<Vec<String>> = self.note.get(account_id);

    if user {
        let mut list =  match self.note.get(account_id) {
            Some(var) => var;
            None => vec![];            
        };

        list.push(note_text + " || " +&amount + " NEAR.");
        self.note.insert(&account_id, &list);
    } else {
        let list = vec![note_text + " || " +&amount + " NEAR."];
        self.note.insert(&account_id, &list);
    }
}
 //view methods
pub view_donations(self, user:String) -> Vec<String> {
    match self.note.get(&user) {
        Some(var) => var;
        None => vec![]
    }
}
}
