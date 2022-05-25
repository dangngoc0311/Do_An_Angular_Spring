package com.example.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;


@Entity
@Table(name = "Reviewbook")
public class ReviewBook {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "id")
private Integer id;
@Column(name = "rating")
private Integer rating;
@Column(name = "description")
private String description;
@Column(name = "status")
private Boolean status;
@CreationTimestamp
@Column(name = "reviewdate",nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
private Date reviewdate;
@ManyToOne
@JoinColumn(name = "accountid",referencedColumnName = "id")
private Account objReviewBook;

@ManyToOne
@JoinColumn(name = "bookid",referencedColumnName = "id")
private Book objBookReview;
public ReviewBook() {
	super();
	// TODO Auto-generated constructor stub
}

public ReviewBook(Integer id, Integer rating, String description, Boolean status, Date reviewdate,
		Account objReviewBook, Book objBookReview) {
	super();
	this.id = id;
	this.rating = rating;
	this.description = description;
	this.status = status;
	this.reviewdate = reviewdate;
	this.objReviewBook = objReviewBook;
	this.objBookReview = objBookReview;
}

public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public Integer getRating() {
	return rating;
}
public void setRating(Integer rating) {
	this.rating = rating;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public Boolean getStatus() {
	return status;
}
public void setStatus(Boolean status) {
	this.status = status;
}
public Account getObjReviewBook() {
	return objReviewBook;
}
public void setObjReviewBook(Account objReviewBook) {
	this.objReviewBook = objReviewBook;
}
public Book getObjBookReview() {
	return objBookReview;
}
public void setObjBookReview(Book objBookReview) {
	this.objBookReview = objBookReview;
}

public Date getReviewdate() {
	return reviewdate;
}

public void setReviewdate(Date reviewdate) {
	this.reviewdate = reviewdate;
}

}
