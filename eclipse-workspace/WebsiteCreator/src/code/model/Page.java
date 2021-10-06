package code.model;

public class Page {

	private String body;
	private String name;
	private String type;
	private String location;

	public Page() {
	}

	public Page(String body, String name, String type, String location) {
		super();
		this.body = body;
		this.name = name;
		this.type = type;
		this.location = location;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@Override
	public String toString() {
		return "Page [name=" + name + ", location=" + location + "]";
	}

	
}
