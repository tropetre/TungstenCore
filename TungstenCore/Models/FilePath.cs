namespace TungstenCore.Models
{
    using Enums;

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FilePath
    {
        public string FilePathId { get; set; } = Guid.NewGuid().ToString();
        [StringLength(255)]
        public string FileName { get; set; }
        public FileType FileType { get; set; }
        [Required, ForeignKey("Owner")]
        public string OwnderId { get; set; }
        public virtual ApplicationUser Owner { get; set; }
    }
}