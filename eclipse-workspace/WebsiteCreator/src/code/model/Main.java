package code.model;

import code.model.impl.PageImpl;

public class Main {
	public static void main(String[] args) {
		PageImpl pi = new PageImpl();
		System.out.println(pi.createPage());
	}
}