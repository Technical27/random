#include <iostream>
#include <bitset>
#include <sstream>

std::string convertBits (std::string input) {
  std::string output;
  std::stringstream stream (input);
  std::bitset<8> bits;
  while (stream.good()) {
    stream >> bits;
    output += char(bits.to_ulong());
  }
  return output;
}

int main () {
  std::string text;
  while (true) {
    std::cin >> text;
    if (text == "quit") return 0;
    std::cout << convertBits(text) << '\n';
  }
}
