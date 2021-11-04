using AutoMapper;
using API.Core.Domain;

namespace API.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
        }
    }
}