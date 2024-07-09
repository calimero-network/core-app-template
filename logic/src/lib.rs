use calimero_sdk::{
    app,
    borsh::{BorshDeserialize, BorshSerialize},
};

#[app::event]
pub enum Event {
    Increased,
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
        self.count
    }

    fn set_count(&mut self, count: u32) {
        self.count = count;
    }

    pub fn increase_count(&mut self, count: u32) {
        self.count = self.count + count;
        app::emit!(Event::Increased);
    }

    pub fn reset(&mut self) {
        self.count = 0;
        app::emit!(Event::Reset);
    }
}
