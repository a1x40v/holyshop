using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Core.Domain;
using API.Persistance;
using API.DTOs;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public ProductsController(DataContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(int page = 1, int pageSize = 10)
        {
            IQueryable<Product> source = _dbContext.Products;
            int amount = await source.CountAsync();
            var items = await source.OrderBy(p => p.Title).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new PaginationDto<Product> { Amount = amount, Data = items });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            var product = await _dbContext.Products.FindAsync(id);

            if (product == null) return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            _dbContext.Products.Add(product);

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Failed to create product");

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(Guid id, Product product)
        {
            product.Id = id;
            var existedProduct = await _dbContext.Products.FindAsync(id);

            if (existedProduct == null) return NotFound();

            _mapper.Map(product, existedProduct);

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Failed to edit product");

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await _dbContext.Products.FindAsync(id);

            if (product == null) return NotFound();

            _dbContext.Remove(product);

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Failed to delete product");

            return Ok();
        }
    }
}