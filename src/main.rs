use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn get_lines(filename: &str) -> Vec<String> {
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);
    
    reader.lines()
        .map(|line| line.unwrap())
        .filter(|line| line != "")
        .collect()
}

fn get_numbers(filename: &str) -> Vec<i32> {
    let lines = get_lines(filename);
    
    lines.iter()
        .map(|line| line.parse::<i32>().unwrap())
        .collect()
}

fn get_filename(is_test_mode: bool) -> String {
    let base_path = String::from("/home/joppe/work/joppe/adventofcode/day-01/");

    if is_test_mode {
        return base_path + "example.txt";
    }

    base_path + "input.txt"
}

fn part1(numbers: &Vec<i32>) -> i32 {
    let sum = 2020;

    for (i, a) in numbers.iter().enumerate() {
        for (j, b) in numbers.iter().enumerate() {
            if i != j && a + b == sum {
                return a * b;
            }
        }
    }

    return 0
}

fn part2(numbers: &Vec<i32>) -> i32 {
    let sum = 2020;

    for (i, a) in numbers.iter().enumerate() {
        for (j, b) in numbers.iter().enumerate() {
            for (k, c) in numbers.iter().enumerate() {
                if i != j && j != k && a + b + c == sum {
                    return a * b * c;
                }
            }
        }
    }

    return 0
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let is_test_mode = args.contains(&"test".to_string());
    let filename = get_filename(is_test_mode);
    let numbers = get_numbers(&filename.to_string());

    println!("Test mode is {}", is_test_mode);
    println!("Part1 result: {}", part1(&numbers));
    println!("Part2 result: {}", part2(&numbers));
}
