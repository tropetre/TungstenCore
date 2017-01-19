using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TungstenCore.Models
{
    public class File
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public byte[] Content { get; set; }

        [ForeignKey("FileDetail")]
        public string FileDetailId { get; set; }
        public virtual FileDetail FileDetail { get; set; }
    }
}
