package com.example.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Book")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "name")
	private String name;
	@Column(name = "author")
	private String author;
	@Column(name = "publisher")
	private String publisher;
	@Column(name = "price")
	private Double price;
	@Column(name = "saleprice", nullable = true)
	private Double saleprice;
	@Column(name = "typesale", nullable = true)
	private Boolean typesale;
	@Column(name = "description")
	private String description;
	@Column(name = "image")
	private String image;
	@Column(name = "quantity")
	private Integer quantity;
	@Column(name = "hot")
	private Boolean hot;
	@Column(name = "status")
	private Boolean status;
	@ManyToOne
	@JoinColumn(name = "categoryid", referencedColumnName = "id", nullable = false)
	private Category objCategory;
	@OneToMany(mappedBy = "objBookOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<OrderDetail> listOrderDetail;
	@OneToMany(mappedBy = "objBookReview", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<ReviewBook> listReviewBook;

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Book(Integer id, String name, String author, String publisher, Double price, Double saleprice,
			Boolean typesale, String description, String image, Integer quantity, Boolean hot, Boolean status,
			Category objCategory, Set<OrderDetail> listOrderDetail, Set<ReviewBook> listReviewBook) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.publisher = publisher;
		this.price = price;
		this.saleprice = saleprice;
		this.typesale = typesale;
		this.description = description;
		this.image = image;
		this.quantity = quantity;
		this.hot = hot;
		this.status = status;
		this.objCategory = objCategory;
		this.listOrderDetail = listOrderDetail;
		this.listReviewBook = listReviewBook;
	}



	

	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getSaleprice() {
		return saleprice;
	}

	public void setSaleprice(Double saleprice) {
		this.saleprice = saleprice;
	}

	public Boolean getTypesale() {
		return typesale;
	}

	public void setTypesale(Boolean typesale) {
		this.typesale = typesale;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Boolean getHot() {
		return hot;
	}

	public void setHot(Boolean hot) {
		this.hot = hot;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Category getObjCategory() {
		return objCategory;
	}

	public void setObjCategory(Category objCategory) {
		this.objCategory = objCategory;
	}

	public Set<OrderDetail> getListOrderDetail() {
		return listOrderDetail;
	}

	public void setListOrderDetail(Set<OrderDetail> listOrderDetail) {
		this.listOrderDetail = listOrderDetail;
	}

	public Set<ReviewBook> getListReviewBook() {
		return listReviewBook;
	}

	public void setListReviewBook(Set<ReviewBook> listReviewBook) {
		this.listReviewBook = listReviewBook;
	}

}
