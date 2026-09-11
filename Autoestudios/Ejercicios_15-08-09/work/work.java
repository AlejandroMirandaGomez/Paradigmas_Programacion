long fibo(int n) {
	record Par(long anterior, long actual) {}
	return Stream.iterate(new Par(1L, 1L), x -> new Par(x.actual, x.anterior + x.actual)).skip(n).findFirst().get().anterior;
}

void main() {
	record Par<A, B>(A anterior, B actual) {}

	var p = new Par<>(3, "tres");
	p.anterior();  // 3
	p.actual();  // "tres"
	// IO.println(p);
	
	IO.println(fibo(4));
}