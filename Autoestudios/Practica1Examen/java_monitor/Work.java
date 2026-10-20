import java.util.function.*;
import java.util.*;

sealed interface Link<L, R> permits PersonLink, ThingLink{}
enum Gender {MALE, FEMALE}
record Name(String first, String last){}
record Thing(String description, double cost){}
record Person(Name name, int age, Gender gender){}
record ThingLink(Person owner, Thing thing) implements Link<Person, Thing>{}
record PersonLink(Person parent, Person child) implements Link<Person, Person>{}

class Graph extends ArrayList<Link>{
	public Graph(List<Link> links){
		super(links);
	}
	
	public Graph(){}
	
	public Graph personLinks(Graph graph, Person person){
		return new Graph(graph.stream()
		.filter(l -> l instanceof PersonLink p
			? p.parent() == person && p.child().gender() == Gender.FEMALE
			: ((ThingLink) l).thing().cost() != 0)
		.toList());
	}
	
	public Graph personLinks2(Graph graph, Person person){
		return new Graph(graph.stream()
		.filter(l -> 
			switch(l){
				case ThingLink t -> t.thing().cost() != 0;
				case PersonLink p -> p.parent() == person && p.child().gender() == Gender.FEMALE;
			}
		).toList());
	}
}

void main(){
}
