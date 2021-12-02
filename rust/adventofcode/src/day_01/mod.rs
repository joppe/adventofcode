use crate::common;

fn puzzle1(filename: &str) {
    println!("Puzzle 1");
    println!("filename {}", filename);

    let lines = common::get_lines_as_numbers(filename);
    let result: i32 = lines
        .iter()
        .enumerate()
        .map(|(index, _)| {
            if index > 0 && lines[index] > lines[index - 1] {
                1
            } else {
                0
            }
        })
        .sum();

    println!("result = {}", result);
}

fn puzzle2(filename: &str) {
    println!("Puzzle 2");
    println!("filename {}", filename);

    let lines: Vec<i32> = common::get_lines_as_numbers(filename);
    let threeMeasurements: Vec<i32> = lines
        .iter()
        .enumerate()
        .map(|(index, _)| {
            if index < 2 {
                0
            } else {
                lines[index - 2] + lines[index - 1] + lines[index]
            }
        })
        .filter(|&x| x > 0)
        .collect();

    let result: i32 = threeMeasurements
        .iter()
        .enumerate()
        .map(|(index, _)| {
            if index > 0 && threeMeasurements[index] > threeMeasurements[index - 1] {
                1
            } else {
                0
            }
        })
        .sum();

    println!("result = {}", result)
}

pub fn main() {
    // puzzle1("day_01/ref1.txt");
    // puzzle1("day_01/input1.txt");

    puzzle2("day_01/ref2.txt");
    puzzle2("day_01/input2.txt");
}