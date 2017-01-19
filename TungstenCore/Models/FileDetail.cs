namespace TungstenCore.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FileDetail
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required, StringLength(255)]
        public string FileName { get; set; }
        public string Extension { get; set; }
        [Required, ForeignKey("Owner")]
        public string OwnerId { get; set; }
        public virtual ApplicationUser Owner { get; set; }
        [ForeignKey("Assignment")]
        public string AssignmentId { get; set; }
        public virtual Assignment Assignment { get; set; }
        [Required, ForeignKey("File")]
        public string FileId { get; set; }
        public virtual File File { get; set; }
    }
}