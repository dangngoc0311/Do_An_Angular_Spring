package com.example.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import javax.servlet.ServletContext;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Book;
import com.example.service.BookService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/admin/book")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class BookController {
	private final BookService bookService;
	@Autowired
	ServletContext context;

	public BookController(BookService BookService) {
		this.bookService = BookService;
	}

	/**
	 * This method return list book
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param cateId      This value is the category to find
	 * @param min         This value is the minimum price to find
	 * @param max         This value is the maximum price to find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	@GetMapping("/listBook")
	public ResponseEntity<Page<Book>> getAllBook(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "6") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "cateId", required = false) Integer cateId,
			@RequestParam(name = "min", required = false) Double min,
			@RequestParam(name = "max", required = false) Double max,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		if (min != null && max != null && searchValue == null && cateId == null) {
			Page<Book> books = bookService.selectBookByPrice(min, max, pageNumber, pageSize, sortColumn, sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (cateId != null && searchValue == null && min == null && max == null) {
			Page<Book> books = bookService.getBookByCategoryId(cateId, pageNumber, pageSize, sortColumn, sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (searchValue != null && cateId == null && min == null && max == null) {
			Page<Book> books = bookService.searchBook(searchValue, pageNumber, pageSize, sortColumn, sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (min != null && max != null && searchValue != null && cateId == null) {
			Page<Book> books = bookService.getBookByPriceSearch(min, max, searchValue, pageNumber, pageSize, sortColumn,
					sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (min != null && max != null && searchValue == null && cateId != null) {
			Page<Book> books = bookService.getBookByPriceCate(cateId, min, max, pageNumber, pageSize, sortColumn,
					sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (min == null && max == null && searchValue != null && cateId != null) {
			Page<Book> books = bookService.getBookBySearchCate(cateId, searchValue, pageNumber, pageSize, sortColumn,
					sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (min != null && max != null && searchValue != null && cateId != null) {
			Page<Book> books = bookService.getBookByAllCondition(cateId, min, max, searchValue, pageNumber, pageSize,
					sortColumn, sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		if (min == null && max == null && searchValue == null && cateId == null) {
			Page<Book> books = bookService.findAllBooks(pageNumber, pageSize, sortColumn, sortOrder);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		Page<Book> books = bookService.findAllBooks(pageNumber, pageSize, sortColumn, sortOrder);
		return new ResponseEntity<>(books, HttpStatus.OK);
	}

	/**
	 * This method return book find by id
	 * 
	 * @param id The value to be find
	 * @return
	 */
	@GetMapping("/findBook/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable("id") Integer id) {
		Book Book = bookService.findBookById(id);
		return new ResponseEntity<>(Book, HttpStatus.OK);
	}

	/**
	 * This method return the book to be inserted
	 * 
	 * @param bok  The value to be inserted
	 * @param file The value is the image of the book to be inserted
	 * @return
	 * @throws IOException
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 */
	@PostMapping(value = "insertBook")
	@ResponseBody
	public ResponseEntity<Book> insertBook(@RequestParam("book") String bok, @RequestParam("file") MultipartFile file)
			throws IOException, JsonParseException, JsonMappingException {

		Book book = new ObjectMapper().readValue(bok, Book.class);
		String path_Directory = "D:\\Thuc_Tap\\AngularJavaProject\\BackendApp\\src\\main\\resources\\static\\images";
		String fileName = file.getOriginalFilename();
		Files.copy(file.getInputStream(), Paths.get(path_Directory + File.separator + file.getOriginalFilename()),
				StandardCopyOption.REPLACE_EXISTING);
		book.setImage(fileName);
		Book bookAdd = bookService.addBook(book);
		return new ResponseEntity<>(bookAdd, HttpStatus.CREATED);

	}

	/**
	 * The method return the book to be updated
	 * 
	 * @param id            The value is the book id
	 * @param bok           The value to be updated
	 * @param multipartFile The value is the image of the book to be updated
	 * @return
	 * @throws IOException
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 */
	@PutMapping("/updateBook/{id}")
	@ResponseBody
	public ResponseEntity<Book> updateBook(@PathVariable("id") Integer id, @RequestParam("book") String bok,
			@RequestParam("file") MultipartFile multipartFile)
			throws IOException, JsonParseException, JsonMappingException {
		Book book = new ObjectMapper().readValue(bok, Book.class);
		String path_Directory = "D:\\Thuc_Tap\\AngularJavaProject\\BackendApp\\src\\main\\resources\\static\\images";
		String fileName = multipartFile.getOriginalFilename();
		Files.copy(multipartFile.getInputStream(),
				Paths.get(path_Directory + File.separator + multipartFile.getOriginalFilename()),
				StandardCopyOption.REPLACE_EXISTING);

		System.out.println(fileName);
		Book bk = bookService.findBookById(id);
		if (!multipartFile.isEmpty()) {

			bk.setImage(fileName);

		} else {
			bk.setImage(book.getImage());
		}
		bk.setName(book.getName());
		bk.setAuthor(book.getAuthor());
		bk.setPublisher(book.getPublisher());
		bk.setPrice(book.getPrice());
		bk.setTypesale(book.getTypesale());
		bk.setSaleprice(book.getSaleprice());
		bk.setDescription(book.getDescription());
		bk.setHot(book.getHot());
		bk.setStatus(book.getStatus());
		bk.setQuantity(book.getQuantity());
		bk.setObjCategory(book.getObjCategory());

		Book updateBook = bookService.updateBook(bk);
		return new ResponseEntity<>(updateBook, HttpStatus.OK);
	}

	/**
	 * The method return the book to be deleted
	 * 
	 * @param id The value is the book id
	 * @return
	 */
	@DeleteMapping("/deleteBook/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable("id") Integer id) {
		bookService.deleteBook(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	/**
	 * The method return the image of book
	 * 
	 * @param filename The value is image name
	 * @return
	 */
	@GetMapping("/getImageBook/{filename}")
	public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
		String path_Directory = "D:\\Thuc_Tap\\AngularJavaProject\\BackendApp\\src\\main\\resources\\static\\images\\";
		byte[] image = new byte[0];
		try {
			image = FileUtils.readFileToByteArray(new File(path_Directory + filename));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
	}

	/**
	 * The method return list new book
	 * 
	 * @return
	 */
	@GetMapping("/getNewBook")
	public ResponseEntity<List<Book>> getNewBook() {
		List<Book> books = bookService.selectNewBook();
		return new ResponseEntity<>(books, HttpStatus.OK);
	}

	/**
	 * The method return list related book
	 * 
	 * @param cateId The value is category value to be find
	 * @param id     The value is book id
	 * @return
	 */
	@GetMapping("/getRelatedBook/{cateId}/{id}")
	public ResponseEntity<List<Book>> getRelatedBook(@PathVariable("cateId") Integer cateId,
			@PathVariable("id") Integer id) {
		List<Book> books = bookService.relatedBook(cateId, id);
		return new ResponseEntity<>(books, HttpStatus.OK);
	}

	/**
	 * 
	 * @param id
	 * @param bok
	 * @return
	 * @throws IOException
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 */
	@PutMapping("/updateBookNoImage/{id}")
	@ResponseBody
	public ResponseEntity<Book> updateBookNoImage(@PathVariable("id") Integer id, @RequestParam("book") String bok)
			throws IOException, JsonParseException, JsonMappingException {
		Book book = new ObjectMapper().readValue(bok, Book.class);
		Book bk = bookService.findBookById(id);
		bk.setName(book.getName());
		bk.setAuthor(book.getAuthor());
		bk.setPublisher(book.getPublisher());
		bk.setPrice(book.getPrice());
		bk.setTypesale(book.getTypesale());
		bk.setSaleprice(book.getSaleprice());
		bk.setDescription(book.getDescription());
		bk.setHot(book.getHot());
		bk.setStatus(book.getStatus());
		bk.setQuantity(book.getQuantity());
		bk.setObjCategory(book.getObjCategory());
		Book updateBook = bookService.updateBook(bk);
		return new ResponseEntity<>(updateBook, HttpStatus.OK);
	}
}
