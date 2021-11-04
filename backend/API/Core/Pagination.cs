using System;

namespace API.Core
{
    public class Pagination
    {
        public int PageNumber { get; private set; }
        public int TotalPage { get; private set; }
        public Pagination(int count, int pageSize = 10, int pageNumber = 1)
        {
            PageNumber = pageNumber;
            TotalPage = (int)Math.Ceiling(count / (double)pageSize);
        }
    }
}