using System.Collections.Generic;

namespace API.DTOs
{
    public class PaginationDto<T>
    {
        public int Amount { get; set; }
        public List<T> Data { get; set; }
    }
}