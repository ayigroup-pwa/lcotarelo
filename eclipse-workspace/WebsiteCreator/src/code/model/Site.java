package code.model;

import java.util.List;

public class Site {

	private List<Page> pages;

	public Site(List<Page> pages) {
		this.pages = pages;
	}

	public List<Page> getPages() {
		return pages;
	}

	public void setPages(List<Page> pages) {
		this.pages = pages;
	}

}