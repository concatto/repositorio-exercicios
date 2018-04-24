#include <iostream>

int fatorial(int n) {
  return n <= 1 ? 1 : n * (fatorial(n - 1);
}

int main() {
  int in;
  std::cin >> in;
  std::cout << fatorial(in);
  return 1;
}