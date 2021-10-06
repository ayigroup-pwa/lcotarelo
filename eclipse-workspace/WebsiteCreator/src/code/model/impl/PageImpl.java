package code.model.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

import code.model.Page;
import code.model.interfaces.ICreable;

public class PageImpl implements ICreable {

	Page p1 = new Page();
	static HeadImpl hi = new HeadImpl();
	static BodyImpl bi = new BodyImpl();
	static Scanner sc = new Scanner(System.in);

	public String body() {
		String header = hi.createPage();
		String body = bi.createPage();
		System.out.println("El valor del head es " + header);
		String htmlTag = "<html>" + header + body + "<html>";

		return htmlTag;

	}

	public String createPage() {
		String nombre = "liaDGU";
		p1.setName(nombre);
		String ruta = "/Users/leandrocotarelo/eclipse-workspace/WebsiteCreator/src/" + nombre + ".html";
		p1.setLocation(ruta);
		String html = body();
		try {
			File file = new File(ruta);
			if (!file.exists()) {
				file.createNewFile();
			}
			FileWriter fw = new FileWriter(file);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(html);
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(html);
		return "Pagina creada con exito: " + nombre + ".html";
	}

}
