package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.model.Book;
import com.example.repository.BookRepository;

@Service
public class BookService {
	private final BookRepository bookRepository;

	@Autowired
	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	/**
	 * Method insert book
	 * 
	 * @param book This value to be insert
	 * @return
	 */
	public Book addBook(Book book) {
		return bookRepository.save(book);

	}

	/**
	 * Method get list book
	 * 
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> findAllBooks(int pageNumber, int pageSize, String sortColumn, String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.findAll(page);
	}

	/**
	 * Method update book
	 * 
	 * @param book This value to be update
	 * @return
	 */
	public Book updateBook(Book book) {
		return bookRepository.save(book);
	}

	/**
	 * Method find book by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	public Book findBookById(Integer id) {
		return bookRepository.findBookById(id);
	}

	/**
	 * Method delete book
	 * 
	 * @param id This value to be delete
	 */
	public void deleteBook(Integer id) {
		bookRepository.deleteBookById(id);
	}

	/**
	 * Method search book by name with pagination
	 * 
	 * @param name       This value to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> searchBook(String name, int pageNumber, int pageSize, String sortColumn, String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.findBookByName(name, page);
	}

	/**
	 * Method search book by category with pagination
	 * 
	 * @param cateId     This value is category id to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> getBookByCategoryId(Integer cateId, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.getBookByCategoryId(cateId, page);
	}

	/**
	 * Method search book by price with pagination
	 * 
	 * @param min        This value is the minimum price to find
	 * @param max        This value is the maximum price to find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> selectBookByPrice(Double min, Double max, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.selectBookByPrice(min, max, page);
	}

	/**
	 * Method get 2 new book
	 * 
	 * @return
	 */
	public List<Book> selectNewBook() {
		return bookRepository.findNewBook();
	}

	/**
	 * Method get list related book(limit 4)
	 * 
	 * @param cateId
	 * @param id
	 * @return
	 */
	public List<Book> relatedBook(Integer cateId, Integer id) {
		return bookRepository.relatedBook(cateId, id, 0, 4);
	}

	/**
	 * Method search book by category and price with pagination
	 * 
	 * @param cateId     This value is category id to be find
	 * @param min        This value is the minimum price to find
	 * @param max        This value is the maximum price to find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */

	public Page<Book> getBookByPriceCate(Integer cateId, Double min, Double max, int pageNumber, int pageSize,
			String sortColumn, String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.selectBookByPriceCate(cateId, min, max, page);
	}

	/**
	 * Method search book by category and name with pagination
	 * 
	 * @param cateId     This value is category id to be find
	 * @param name       This value is name to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> getBookBySearchCate(Integer cateId, String name, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.selectBookByCateSearch(cateId, name, page);
	}

	/**
	 * Method search book by price and name with pagination
	 * 
	 * @param min        This value is the minimum price to find
	 * @param max        This value is the maximum price to find
	 * @param name       This value is name to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> getBookByPriceSearch(Double min, Double max, String name, int pageNumber, int pageSize,
			String sortColumn, String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.selectBookByNamePrice(min, max, name, page);
	}

	/**
	 * Method search book by all condition
	 * 
	 * @param cateId     This value is category to be find
	 * @param min        This value is the minimum price to find
	 * @param max        This value is the maximum price to find
	 * @param name       This value is name to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Book> getBookByAllCondition(Integer cateId, Double min, Double max, String name, int pageNumber,
			int pageSize, String sortColumn, String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return bookRepository.selectBookByAllCondition(cateId, name, min, max, page);
	}

}
