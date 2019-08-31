#include <iostream>
#include <bitset>

void printBits (std::string str) {
  for (char c : str) {
    std::cout << std::bitset<8>(c) << ' ';
  }
  std::cout << '\n';
}

int main () {
  std::string text;
  while (true) {
    std::cin >> text;
    if (text == "quit") return 0;
    printBits(text);
  }
}
