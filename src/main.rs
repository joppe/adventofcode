use std::env;

mod common;
mod day_01;

fn main() {
    let args: Vec<String> = env::args().collect();
    let is_test_mode = args.contains(&"test".to_string());
    
    println!("Test mode is {}", is_test_mode);

    day_01::main(is_test_mode);
}

