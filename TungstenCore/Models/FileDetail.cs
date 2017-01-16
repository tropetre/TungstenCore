namespace TungstenCore.Models
{
    using Enums;

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FileDetail
    {
        [Key]
        public string FilePathId { get; set; } = Guid.NewGuid().ToString();
        [Required, StringLength(255)]
        public string FileName { get; set; }
        public string Extension { get; set; }
        public FileType FileType { get; set; }
        [Required, ForeignKey("Owner")]
        public string OwnerId { get; set; }
        public virtual ApplicationUser Owner { get; set; }
        public Guid Id { get; internal set; }
    }
}