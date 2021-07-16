use std::fs::File;
use std::io::{BufRead, BufReader};

pub fn get_lines(filename: &str) -> Vec<String> {
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);
    
    reader.lines()
        .map(|line| line.unwrap())
        .filter(|line| line != "")
        .collect()
}

pub fn get_numbers(filename: &str) -> Vec<i32> {
    let lines = get_lines(filename);
    
    lines.iter()
        .map(|line| line.parse::<i32>().unwrap())
        .collect()
}

pub fn get_filename(day: &str, is_test_mode: bool) -> String {
    let base_path = String::from("/home/joppe/work/joppe/adventofcode/");
    let mut name = String::from("input.txt");
    
    if is_test_mode {
        name = String::from("example.txt");
    }

    format!("{}{}/{}", base_path, day, name)
}

