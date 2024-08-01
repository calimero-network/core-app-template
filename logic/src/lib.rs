use core::num;

use calimero_sdk::{
    app,
    borsh::{BorshDeserialize, BorshSerialize},
    env,
};

#[app::event]
pub enum Event {
    Increased(u32),
    Reset,
}

#[app::state(emits = Event)]
#[derive(Default, BorshDeserialize, BorshSerialize)]
#[borsh(crate = "calimero_sdk::borsh")]
struct AppState {
    count: u32,
}

#[app::logic]
impl AppState {
    pub fn get_count(&self) -> u32 {
        env::log("Get counter");
        self.count
    }

    fn set_count(&mut self, count: u32) {
        env::log(&format!("Set counter to {:?}", count));
        self.count = count;
    }

    pub fn increase_count(&mut self, count: u32) -> u32 {
        env::log(&format!("Increasing counter by {:?}", count));
        self.count = self.count + count;
        app::emit!(Event::Increased(self.count));
        self.count
    }

    pub fn reset(&mut self) {
        env::log("Reset counter");
        self.count = 0;
        app::emit!(Event::Reset);
    }
}
