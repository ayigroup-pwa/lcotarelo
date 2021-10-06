package code.model.impl;

import java.util.Scanner;

import code.model.interfaces.ICreable;

public class BodyImpl implements ICreable{

	Scanner sc = new Scanner(System.in);

	static String bodyContent;
	static String bodyTag;

	@Override
	public String createPage() {
		System.out.println("Que vas a escribir en el cuerpo?");
		String bodyContent = sc.nextLine();
		String bodyTag = "<body>" + bodyContent + "<body>";
		return bodyTag;
	}

}
