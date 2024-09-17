using Example06.Context;
using Example06.Models;
using Microsoft.AspNetCore.Mvc;
namespace Example06.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController:ControllerBase
    {
        public readonly ProductContext db;
        public CategoriesController(ProductContext db){
            this.db = db;
        }
        //Get: api/<CategoriesController>
        [HttpGet]
      public IEnumerable<Category> Get()
      {
        return db.Categories.ToList();
      }
        //Get api/<CategoriesController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return db.Categories.Find(id);
        }
        //Post api/<CategoriesController>
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] FormCategoryView category)
        {
            var cate = new Category()
            {
                Name = category.Name,
                SlugCategory = category.SlugCategory
            };
            db.Categories.Add(cate);
            await db.SaveChangesAsync();
            if (cate.idCategory > 0 )
            {
                return Ok(1);
            }
            return Ok(0);
        }
        //Put api/<CategoriesController>/5
        [HttpPut("{id}")]
       public void Put (int id , [FromBody] string value)
       {

       }
        //Delete api/<CategoriesController>/5
        [HttpDelete("{id}")]
       public void Delete (int id)
       {
        
       }
    }
}