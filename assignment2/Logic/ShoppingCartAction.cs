using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment2.Data;
using assignment2.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace assignment2.Logic
{
    public class ShoppingCartAction
    {
        public string ShoppingCartId { get; set; }
        private ApplicationDbContext _db;
        public const string CartSessionKey = "CartId";
        public ShoppingCartAction(ApplicationDbContext db)
        {
            _db = db;
        }

        
    }
}