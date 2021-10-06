package code.model.impl;

import java.util.Scanner;

import code.model.Head;
import code.model.interfaces.ICreable;

public class HeadImpl implements ICreable {

	Scanner sc = new Scanner(System.in);
	static Head head = new Head();
	static String headTag = "";

	@Override
	public String createPage() {
		System.out.println("Que vas a escribir en el titulo?");
		String headContent = sc.nextLine();
		head.setTitle(headContent);
		String headTag = "<head><title>" + headContent + "</title></head>";
		return headTag;
	}

}
